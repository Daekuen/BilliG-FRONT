import Nav from '../components/nav/Nav';
import MyInfoHeader from 'components/myinfo/MyInfoHeader';
import MyInfoSideBar from '../components/myinfo/MyinfoSideBar';
import MyGivePostList from '../components/myinfo/MyGivePostList';
import { useIsLoginStore } from 'store/LoginJoinStore';
import TrueNav from '../components/nav/TrueNav';

export default function MyGivePostListPage() {
  const { isLogin } = useIsLoginStore();
  return (
    <div className="h-full w-screen max-w-screen-lg m-auto">
      {isLogin ? <TrueNav /> : <Nav />}
      <MyInfoHeader />
      <section className="max-w-screen-lg h-full">
        <div className="flex h-full">
          <MyInfoSideBar />
          <MyGivePostList />
        </div>
      </section>
    </div>
  );
}
