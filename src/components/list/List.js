'use client'

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Image from 'next/image';
import "./List.scss";

const InfiniteScrollPage = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  //bookmark
  const [bookmarkedItems, setBookmarkedItems] = useState({});
  const handleClick = (id) => {
    setBookmarkedItems({
      ...bookmarkedItems,
      [id]: !bookmarkedItems[id]
    });
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    try {
      if (page > 4) {
        setHasMore(false);
        return;
      }

      const res = await axios.get(`https://cea13314-94c5-4b7f-b96f-546f2fb397c9.mock.pstmn.io/jptest?page=${page}`);
      const newItems = res.data.data.recruits; // Extract items array
      setItems([...items, ...newItems]);
      setPage(page + 1);

      console.log(newItems);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={items.length === 0 ? <div class="inline_spinner">
      <div class="loading_spinner_img bouncing-loader">
        <div class="bouncing-loader__round"></div>
        <div class="bouncing-loader__round"></div>
        <div class="bouncing-loader__round"></div>
        </div>
      <div class="loading_spinner_bg"></div>
    </div> : null}     
      scrollThreshold={1.0}   
      className="bg-white"
    >
      <div className="item-list grid grid-cols-3 gap-8">
        {items.map((item, index) => (
          <div key={index} className="item-card">
            <div className="item-card__thumbnail">
                <button type="button" className="btn_bookmark" onClick={() => handleClick(item.id)}>
                <i className={bookmarkedItems[item.id] ? "jp-bookmark-solid" : "jp-bookmark"}></i>
                </button>
                <div className="thumbnail_image">
                  <Image 
                    width={300}
                    height={300}
                    src={item.image} 
                    className="lazyloaded" 
                  />
                </div>
            </div>
            <div className="item-card__information">
                <div className="item-card__title">{item.title}</div>
                {item.skills && item.skills.length > 0 && (
                  <div className="item-card__skill">{item.skills.join(', ')}</div>
                )}
                <div className="item-card__company">
                    <div className="item-card__logo">
                      <Image 
                        width={50}
                        height={50}
                        className="lazyloaded"
                        src={item.company.logo}
                        alt={item.company.name + " 로고"}
                      />
                    </div>
                    <div className="item-card__name">{item.company.name}</div>
                    <div className="item-card__grade no-review"><strong><i className="jp-star-solid"></i>{item.company.grade}</strong><span>({item.company.grade_count})</span></div>
                </div>
                <div className="item-card__welfare">
                    <p>{item.appeal}</p>
                </div>
                <div className="item-card__reward"><strong><i className="jp-won-sign"></i>취업 축하금: {String(`${item.reward}`).substring(0, 3)}만원</strong></div>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default InfiniteScrollPage;
