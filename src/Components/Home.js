import React, { useState } from 'react';
import Header from './Header'
import Moment from 'react-moment';
import moment from 'moment'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';

  const items = [
    {
        src: 'https://wallpaperaccess.com/full/1324855.jpg',
        altText: '',
        caption: ''
    },
    {
        src: 'https://wallpaperaccess.com/full/767033.jpg',
        altText: '',
        caption: ''
    },
    {
        src: 'https://thehighdefinitionwallpapers.com/wp-content/uploads/2020/03/FoodsFoods-Delicious-and-spicy-pizza-wonderful-food-HD-wallpaper.jpg',
        altText: '',
        caption: ''
    }    
];

function Home({props}) {    
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });
  
    const dateToday = moment().format('MMMM Do YYYY');
    const dateWeek = moment().format('dddd');
    var currentHour = moment().format("HH")

    const MOTD = <div className="motd">
        { 
            currentHour < 12 ? 
                <div className="motd-holder">
                    <p className="title">Morning Tea of the day</p>
                    <p className="sub-title">Chocolate Gannache</p>
                </div> 
            : 
                <div className="motd-holder">
                    <p className="title">Afternoon Tea of the day</p>
                    <p className="sub-title">Chocolate Gannache</p>
                </div>
        }
    </div>

  return (
    <main className="home">
        <Header />
        <div className="carousel-holder">
            <div className="date">
                <p className="date-today">{dateToday}</p>
                <p className="date-week">{dateWeek}</p>
            </div>
            {MOTD}
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        </div>
    </main>
  );
}

export default Home;
