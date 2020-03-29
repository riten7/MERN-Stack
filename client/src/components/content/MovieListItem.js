import React from 'react';
import { useSelector } from 'react-redux';
import { PLACEHOLDER_IMG } from '../Constant';
import { Link } from 'react-router-dom';
import { Col, Card } from 'antd';

const MovieListItem = () => {
  const { Meta } = Card;
  const movieList = useSelector((state) => {
    return getFilteredList(state.movieList, state.filterMovieBy);
  });
  return (
    <>
      {movieList && movieList.length > 0 ? movieList.map(item => (
        <Col key={item._id+item.id} className="gutter-row" span={6} offset={1}>
          <Link to={{ pathname: `/movie/${item.id}`}}>
            <Card hoverable
              style={{ width: 240 }}
              cover={<img src={item.poster ? item.poster : PLACEHOLDER_IMG} className="card-img-top" alt={item.title} />}>
              <Meta title={item.title} description={item.type} />
            </Card>
          </Link>
        </Col>
      )) : <div className="noMovieFound">No Movie Found</div>}
    </>
  );
}

const getFilteredList = (list, filterObj) => {
  switch (filterObj.type) {
    case 'SHOW_ALL':
      return list;
    case 'FILTER':
      return list.flat().filter(item => {
        let title = item.title.toLowerCase();
        return title.indexOf(filterObj.text.toLowerCase()) > -1;
      });
    default:
      return;
  }
}

export default MovieListItem;