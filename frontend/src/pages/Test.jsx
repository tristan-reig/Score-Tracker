import Carousel from '../components/Carousel'


const Test = () => {
  return (
    <div>
      <h1>Test</h1>
      <Carousel>
        <div className="bg-blue-800 h-64">Saison R</div>
        <div className="bg-green-800 h-64">Playoffs</div>
      </Carousel>
    </div>
  );
};

export default Test