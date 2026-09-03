import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface NextRouter {
  push: (href: string, options?: { scroll?: boolean }) => void;
  replace: (href: string, options?: { scroll?: boolean }) => void;
  back: () => void;
  forward: () => void;
  prefetch: (href: string) => void;
  refresh: () => void;
}

interface NavigationContextValue {
  pathname: string;
  searchParams: URLSearchParams;
  router: NextRouter;
}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pathname, setPathname] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [searchParams, setSearchParams] = useState<URLSearchParams>(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  });

  // Sync state with current window.location
  const updateLocation = useCallback(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname || '/');
      setSearchParams(new URLSearchParams(window.location.search));
    }
  }, []);

  // Listen to browser popstate (back/forward buttons)
  useEffect(() => {
    window.addEventListener('popstate', updateLocation);
    return () => window.removeEventListener('popstate', updateLocation);
  }, [updateLocation]);

  const push = useCallback((href: string, options?: { scroll?: boolean }) => {
    if (typeof window === 'undefined') return;
    try {
      const url = new URL(href, window.location.origin);
      window.history.pushState({}, '', url.pathname + url.search + url.hash);
      setPathname(url.pathname || '/');
      setSearchParams(new URLSearchParams(url.search));
      if (options?.scroll !== false) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {
      // Fallback for simple relative paths
      window.history.pushState({}, '', href);
      const [path, search] = href.split('?');
      setPathname(path || '/');
      setSearchParams(new URLSearchParams(search || ''));
      if (options?.scroll !== false) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  const replace = useCallback((href: string, options?: { scroll?: boolean }) => {
    if (typeof window === 'undefined') return;
    try {
      const url = new URL(href, window.location.origin);
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
      setPathname(url.pathname || '/');
      setSearchParams(new URLSearchParams(url.search));
      if (options?.scroll !== false) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch {
      window.history.replaceState({}, '', href);
      const [path, search] = href.split('?');
      setPathname(path || '/');
      setSearchParams(new URLSearchParams(search || ''));
      if (options?.scroll !== false) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  const back = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }, []);

  const forward = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.history.forward();
    }
  }, []);

  const prefetch = useCallback((_href: string) => {
    // No-op for SPA client navigation prefetching
  }, []);

  const refresh = useCallback(() => {
    updateLocation();
  }, [updateLocation]);

  const router: NextRouter = {
    push,
    replace,
    back,
    forward,
    prefetch,
    refresh,
  };

  return (
    <NavigationContext.Provider value={{ pathname, searchParams, router }}>
      {children}
    </NavigationContext.Provider>
  );
};

// Next.js App Router hooks emulation
export function useRouter(): NextRouter {
  const context = useContext(NavigationContext);
  if (!context) {
    // Fallback if rendered outside provider
    return {
      push: (href) => {
        if (typeof window !== 'undefined') {
          window.history.pushState({}, '', href);
        }
      },
      replace: (href) => {
        if (typeof window !== 'undefined') {
          window.history.replaceState({}, '', href);
        }
      },
      back: () => window.history.back(),
      forward: () => window.history.forward(),
      prefetch: () => {},
      refresh: () => {},
    };
  }
  return context.router;
}

export function usePathname(): string {
  const context = useContext(NavigationContext);
  return context ? context.pathname : (typeof window !== 'undefined' ? window.location.pathname : '/');
}

export function useSearchParams(): URLSearchParams {
  const context = useContext(NavigationContext);
  return context ? context.searchParams : new URLSearchParams();
}

// Next.js Link component emulation
export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({
  href,
  replace = false,
  scroll = true,
  prefetch: _prefetch,
  onClick,
  children,
  ...rest
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let browser handle special key combinations (ctrl/cmd click for new tab)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      if (onClick) onClick(e);
      return;
    }

    e.preventDefault();
    if (onClick) onClick(e);

    if (replace) {
      router.replace(href, { scroll });
    } else {
      router.push(href, { scroll });
    }
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
