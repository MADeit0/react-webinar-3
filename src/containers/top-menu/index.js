import {memo, useCallback, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import AppBarLayout from "../../components/app-bar-layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";

/**
 * Контейнер с компонентами навигации
 */
function TopMenu() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const {userName, waiting} = useSelector(state => ({
    userName: state.auth.user?.profile?.name,
    waiting: state.auth.waiting
  }));


  const callbacks = {
    onSign: useCallback(() => {
      navigate('/login', {state: {goBack: location.pathname + location.search}})
    }, [location.pathname,location.search]),
    onSignOut: useCallback(() => {
      store.actions.auth.signOut();
    }, [])
  }

  const options = {
    showLink: useMemo(() => {
      if (userName) {
        return (<Link to={'/profile'}>{userName}</Link>)
      } else {
        return ''
      }
    },[userName]),
    toggleAuth: useMemo(() => {
      if (userName) {
        return <button onClick={callbacks.onSignOut}>Выйти</button>
      } else {
        return <button onClick={callbacks.onSign}>Войти</button>
      }
    },[userName]),
  };

  return (
    <Spinner active={waiting}>
    <AppBarLayout side='end' padding='medium'>
      {options.showLink}
      {options.toggleAuth}
    </AppBarLayout>
    </Spinner>
  );
}

export default memo(TopMenu);
