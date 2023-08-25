
import './App.css';
import React from 'react';
import AsideBucket from './components/AsideBucket';
import Footer from './components/Footer';
import Header from './components/Header';
import LogoBadge from './components/LogoBadge';
import Main from './components/Main';
import PizzaDataProvider from './providers/PizzaDataProvider';


function App() {
    function handleAsideHide(e) {
            if (e.target.closest("#openBucketBtn") || e.target.closest("#bucketAside") || e.target.closest(".logo.badge")) {
                // Clicked element is the #openBucketBtn or its descendant, do nothing
                return;
            }
            if (window.innerWidth <= 530 && window.innerWidth > 300) {
              const aside = document.getElementById("bucketAside");
                aside.style.transform = "translateX(100%)";
            }
    
    }
  return (
    <PizzaDataProvider>
    <div className="App"  onClick={handleAsideHide}>
      <main>
        <Header/>
        <Main/>
        <Footer/>
        
      </main>
      <AsideBucket/>
      <LogoBadge/>
    </div>
    </PizzaDataProvider>
  );
}

export default App;
