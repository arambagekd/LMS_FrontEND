import React, { useEffect, useState } from 'react';
import { Form, Input, Button, List, message, Avatar, Rate, Card, Popconfirm, Space } from 'antd';
import { DeleteOutlined, UserOutlined } from '@ant-design/icons';
import axioinstance from '@/app/Instance/api_instance';
import { showToastError, showToastSuccess } from '@/app/Component/NewToast';
import { UserContext } from '@/app/Context/Context';

const { TextArea } = Input;

const ReviewForm = ({isbn}) => {
  const [form] = Form.useForm();
  const [reviews, setReviews] = useState([]);
  const user=React.useContext(UserContext).user;
  const[my,setMy]=useState("all");


  const addreview=async (values)=>{
    try{
        const response=await axioinstance.post("Review/AddReview",{
            description: values.review,
            isbn: isbn,
            stars: values.rating
          });
          form.resetFields();
          showToastSuccess("Review Added Successfully");
          getreviews();
    }catch(error){
         console.log(error);
    }
  }
  
  const deletereview=async (id)=>{
    try{
        const response=await axioinstance.delete(`Review/DeleteReview?reviewid=${id}`);
          form.resetFields();
          showToastSuccess("Review Deleted Successfully");
          getreviews();
    }catch(error){
         showToastError(error,"Failed to delete review");
    }
  }

  const getreviews=async ()=>{
    try{
        const response=await axioinstance.get(`Review/GetBookReviews?isbn=${isbn}`);
        setReviews(response.data);
    }catch(error){
         console.log(error);
    }
  }
  const onFinish = (values) => {
    addreview(values);
  };

  useEffect(() => {
    getreviews();
  },[])

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        Reviews ({reviews.length})<Space />
        <Button onClick={() => my === "all" ? (
    // If currently showing all reviews, filter and show only user's reviews
    (() => {
        setReviews(reviews.filter(e => e.userId === user.userName));
        setMy("my");
    })()
) : (
    // If currently showing user's reviews, fetch all reviews and update state
    (() => {
        getreviews();
        setMy("all");
    })()
)} type="text">
    {my === "all" ? "See My Reviews" : "See All Reviews"}
</Button>

      </div>
      <List
        header={<div style={{ fontSize: '24px', fontWeight: 'bold' }}>Recent Reviews</div>}
        dataSource={reviews.slice(0, 5).reverse()}
        renderItem={(item) => (
          <List.Item>
  <List.Item.Meta
    avatar={<><Avatar src={item.imageUrl} /></>}
    title={<div>{item.username}</div>}
    description={
      <>
        {user.userName === item.userId && user.userType === "patron" ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p>{item.description}</p>
            </div>
            <div>
              <Popconfirm
                title="Delete Your Review"
                description="Are you sure to delete the review?"
                onConfirm={() => deletereview(item.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="text"
                  // onClick={() => handleDeleteReview(item.id)} // Assuming item.id is the identifier for each review
                  icon={<DeleteOutlined />}
                  danger
                >
                  Delete
                </Button>
              </Popconfirm>
            </div>
          </div>
        ) : (
          <p>{item.description}</p>
        )}
        <Rate disabled value={item.stars} style={{ fontSize: 14, marginTop: 5 }} />
      </>
    }
  />
</List.Item>

          
        )}
        style={{ marginBottom: '20px' }}
      />
       {user.userType==="patron" &&
      <Card title="Add a Review" bordered={false}>
       
        <Form
          form={form}
          name="review_form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="review"
            rules={[{ required: true, message: 'Please enter your review' }]}
          >
            <TextArea rows={4} placeholder="Your Review" />
          </Form.Item>
          <Form.Item
            name="rating"
            rules={[{ required: true, message: 'Please provide a rating' }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Card>}
    </div>
  );
};

export default ReviewForm;
