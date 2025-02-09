import React, {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AnimationPagination} from './src';

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <SafeAreaProvider>
      <AnimationPagination
        maxPage={20}
        curPage={currentPage}
        setCurPage={setCurrentPage}
      />
    </SafeAreaProvider>
  );
};

export default App;
