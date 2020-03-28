import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddMoviePopupShown, setMovieList } from '../../actions/actionCreators';
import { BASE_URL } from '../Constant';
import { Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';

const AddMoviePopup = (props) => {
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 16
    },
  };
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const popupShown = useSelector(state => state.popupShown);

   const closePopup = () => (dispatch(setAddMoviePopupShown(false)));

  const getInitialValues = () => {
    const item = props.movie;
    if (item) {
      return {
        title: item.title,
        type: item.type,
        rating: parseInt(item.rating, 10),
        poster: item.poster,
        description: item.description,
        date: moment(item.date, 'YYYY/MM/DD')
      }
    }
  }

  const redirectToTarget = () => {
    // return <Link to={{
    //   pathname: '/'
    // }}>
    // </Link>
  }

  const getBaseUrl = () => {
    return props.movie ? BASE_URL + "/movie/" + props.movie.id : BASE_URL + "/movie";
  }

  const addMovieToDb = useCallback((data) => {
    fetch(getBaseUrl(), {
      method: props.movie ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
      .then(res => res.json())
      .then((response) => {
        closePopup();
        dispatch(setMovieList(response));
        redirectToTarget();
      })
      .catch(() => console.log('error'));
  }, [props.movie, closePopup, dispatch]);

  const onReset = () => {
    form.resetFields();
  };

  const handleSubmit = (values) => {
    if (!props.movie) { values.id = getMovieId(); }
    values.date = values.date.format('YYYY/MM/DD');;
    closePopup();
    addMovieToDb(JSON.stringify(values));
  }

  const getMovieId = () => (Math.random().toString(36).replace('0.', ''));

  return (
    <Modal
      visible={popupShown}
      title="Add Movie"
      onOk={closePopup}
      onCancel={closePopup}
      footer={null}
    >
      <Form className="moviePopup" {...layout} form={form} initialValues={getInitialValues()} onFinish={handleSubmit}>
        <Form.Item name="title" label="Title"
          rules={[{ required: true, },]}>
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type"
          rules={[{ required: true, },]}>
          <Select allowClear>
            <Option value="Movie">Movie</Option>
            <Option value="Series">Series</Option>
            <Option value="Documentary">Documentary</Option>
          </Select>
        </Form.Item>
        <Form.Item name="rating" label="Rating"
          rules={[{ required: true, },]}>
          <Select allowClear>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
          </Select>
        </Form.Item>
        <Form.Item name="date" label="Released on"
          rules={[{ required: true, },]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="poster" label="Poster"
          rules={[{ required: true, },]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description"
          rules={[{ required: true, },]}>
          <TextArea placeholder='Description...' autoSize />
        </Form.Item>
        <Form.Item {...tailLayout}>
          {props.movie ? null : <Button htmlType="button" onClick={onReset}>Reset</Button>}
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddMoviePopup;