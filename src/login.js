import React from "react";
import { useEffect, useRef, useState } from 'react';

let listenerCallbacks = new WeakMap();

let observer;

function handleIntersections(entries) {
  entries.forEach(entry => {
    if (listenerCallbacks.has(entry.target)) {
      let cb = listenerCallbacks.get(entry.target);
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer.unobserve(entry.target);
        listenerCallbacks.delete(entry.target);
        cb();
      }
    }
  });
}

function getIntersectionObserver() {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: '100px',
      threshold: '0',
    });
  }
  return observer;
}

export function useIntersection(elem, callback) {
  useEffect(() => {
    let target = elem.current;
    let observer = getIntersectionObserver();
    listenerCallbacks.set(target, callback);
    observer.observe(target);

    return () => {
      listenerCallbacks.delete(target);
      observer.unobserve(target);
    };
  }, []);
}
const ImageRenderer = ({ url }) => {
  const [isInView, setIsInView] = useState(false);
  console.log(isInView)

  const imgRef = useRef();
  useIntersection(imgRef, () => {
    setIsInView(true);
  });
  return (
    <img
      width="200px"
      height="200px"
      ref={imgRef}
      className='image'
      src={ isInView ? url: ''}
      />
  );
};

function ImageGallery({ images }) {
    return <div style={{display: 'grid', gridTemplateColumns:'repeat(3, 1fr)'}}>{images.map((url, index)=><ImageRenderer key={index} url={url}/>)}</div>;
}

export default ImageGallery;

