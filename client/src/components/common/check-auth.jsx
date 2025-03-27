import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, isLoading, children }) {
  const location = useLocation();

  console.log(
    'Path:',
    location.pathname,
    '| Authenticated:',
    isAuthenticated,
    '| Loading:',
    isLoading
  );

  // Prevent redirections until authentication check is complete
  if (isLoading) return <p>Loading...</p>;

  if (location.pathname === '/') {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      return user?.role === 'admin' ? (
        <Navigate to="/admin/dashboard" />
      ) : (
        <Navigate to="/shop/home" />
      );
    }
  }

  // Redirect unauthorized users to login
  if (
    !isAuthenticated &&
    !['/auth/login', '/auth/register'].includes(location.pathname)
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Prevent logged-in users from accessing login/register pages
  if (
    isAuthenticated &&
    ['/auth/login', '/auth/register'].includes(location.pathname)
  ) {
    return user?.role === 'admin' ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // Restrict non-admin users from accessing admin pages
  if (
    isAuthenticated &&
    user?.role !== 'admin' &&
    location.pathname.startsWith('/admin')
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Restrict admins from accessing user shopping pages
  if (
    isAuthenticated &&
    user?.role === 'admin' &&
    location.pathname.startsWith('/shop')
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
