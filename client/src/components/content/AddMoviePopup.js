import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddMoviePopupShown, addMovieToList } from '../../actions/actionCreators';
import { BASE_URL } from '../Constant';
import { Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

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
  const isEditMode = props.movie;
  const [form] = Form.useForm();
  const { Option } = Select;
  const { TextArea } = Input;
  const history = useHistory();
  const dispatch = useDispatch();
  const popupShown = useSelector(state => state.popupShown);

  const closePopup = () => (dispatch(setAddMoviePopupShown(false)));

  const getInitialValues = () => {
    if (isEditMode) {
      return {
        title: props.movie.title,
        type: props.movie.type,
        rating: parseInt(props.movie.rating),
        poster: props.movie.poster,
        description: props.movie.description,
        date: moment(props.movie.date, 'YYYY/MM/DD')
      }
    }
  }

  const getBaseUrl = () => {
    return isEditMode ? BASE_URL + "/movie/" + props.movie.id : BASE_URL + "/movie";
  }

  const addMovieToDb = useCallback((data) => {
    fetch(getBaseUrl(), {
      method: isEditMode ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
      .then(res => res.json())
      .then((response) => {
        dispatch(setAddMoviePopupShown(false));
        if (!isEditMode) { dispatch(addMovieToList(response)); }
        return history.push('/');
      })
      .catch(() => console.log('error'));
  }, [isEditMode, history, dispatch]);

  const onReset = () => {
    form.resetFields();
  };

  const handleSubmit = (values) => {
    if (!isEditMode) { values.id = getMovieId(); }
    values.date = values.date.format('YYYY/MM/DD');;
    addMovieToDb(JSON.stringify(values));
  }

  const getMovieId = () => (Math.random().toString(36).replace('0.', ''));

  return (
    <Modal
      visible={popupShown}
      title={isEditMode ? 'Edit Movie' : 'Add Movie'}
      onOk={closePopup}
      onCancel={closePopup}
      footer={null}>
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
          {isEditMode ? null : <Button htmlType="button" onClick={onReset}>Reset</Button>}
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddMoviePopup;