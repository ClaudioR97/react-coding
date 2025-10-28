import ProducersList from '../Dashboard/ProducersList';
import Top3List from '../Dashboard/Top3List';
import WinnerByYearList from '../Dashboard/WinnerByYearList';
import YearsList from '../Dashboard/YearsList';
import { DashboardContainer } from './styled';

function Home() {
  return (
    <DashboardContainer>
      <YearsList />
      <Top3List />
      <ProducersList />
      <WinnerByYearList />
    </DashboardContainer>
  );
}

export default Home;
