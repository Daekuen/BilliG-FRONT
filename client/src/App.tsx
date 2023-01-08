import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { useIsLoginStore } from 'store/LoginJoinStore';
import api from './api/customAxios';
// pages
import Main from 'pages/Main';
import LoginJoin from './pages/LoginJoin';
import AdminMain from './pages/AdminMain';
import Writing from './pages/Writing';
import PostDetail from './pages/PostDetail';
import SearchPage from './pages/SearchPage';
import MyPage from './pages/MyPage';
import UserInformation from 'pages/UserInformation';
import PostUpdate from './pages/PostUpdate';
import SubmainPage from './pages/SubmainPage';
import ProductsList from 'pages/ProductsList';
import Notices from 'pages/Notices';
import ReadNotice from 'pages/Notice';
// componets
import ScrollToTop from 'components/ScrollToTop';
import NotFound from 'components/NotFound';
import Loading from 'components/Loading';
import TrueNav from './components/nav/TrueNav';
import Nav from './components/nav/Nav';
import Chat from './components/chat/Chat';

const GlobalStyle = createGlobalStyle`
  ${reset};
  body {
    font-family: 'IBM Plex Sans KR', sans-serif;
  }
`;

const queryClient = new QueryClient();

// 지도 관련 설정
declare global {
  interface Window {
    kakao: any;
  }
}

function App() {
  const {
    isLogin,
    isLoading,
    setIsLoginTrue,
    setIsLoginFalse,
    setIsLoadingTrue,
    setIsLoadingFalse,
  } = useIsLoginStore();

  useEffect(() => {
    setIsLoadingFalse();
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoadingTrue();
      return;
    }

    const getUserInfo = async () => {
      try {
        const userInfo = await api.get('/user/me');
        const id = localStorage.getItem('userId');

        if (userInfo.status === 200 && id === userInfo.data._id) {
          setIsLoginTrue();
        } else {
          setIsLoginFalse();
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserInfo();
    setIsLoadingTrue();
  }, [isLogin]);
  /*dark mode */
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  if ((!isLoading && !isLogin) || (!isLoading && isLogin)) return <Loading />;
  console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <div className="App h-screen w-screen">
          <BrowserRouter>
            <div className="w-screen max-w-screen-lg m-auto">
              {isLogin ? <TrueNav /> : <Nav />}
            </div>
            {/* ScrollToTop : navigate했을 때, 스크롤 위치가 그대로 적용되는 문제 방지*/}
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/submain/*" element={<SubmainPage />} />
              <Route path="/mypage/*" element={<MyPage />} />
              <Route path="/login" element={<LoginJoin />} />
              <Route path="/admin" element={<AdminMain />} />
              <Route path="/write" element={<Writing />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/read/:id" element={<PostDetail />} />
              <Route path="/update/:id" element={<PostUpdate />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/notices/:id" element={<ReadNotice />} />
              <Route path="/user/:id" element={<UserInformation />} />
              <Route
                path="/products/lend/:categoryId"
                element={<ProductsList postType="lend" />}
              />
              <Route
                path="/products/borrow/:categoryId"
                element={<ProductsList postType="borrow" />}
              />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:roomId" element={<Chat />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
