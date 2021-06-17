import React, { useEffect } from 'react';
import axios from 'axios';
import NotificationListItem from '../components/Notifications/NotificationListItem';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
const Index = ({ notifications }) => {
  useEffect(() => {
    console.log(notifications);
  }, []);
  return (
    <div className="p-3 rounded-xl w-full max-w-[600px] my-[50px] mx-auto bg-white shadow-lg">
      <div className="flex items-center justify-between mb-[20px]">
        <h2 className="font-semibold text-2xl">Notification</h2>
        <DotsHorizontalIcon className="h-6 cursor-pointer" />
      </div>
      <div>
        {notifications.notifications.map((notification) => (
          <div>
            <NotificationListItem
              notification={notification}
              key={notification._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps({ req, res }) {
  try {
    // get server side cookies
    const token = req.cookies.token;
    const res = await axios.get(`${process.env.BASE_URL}/api/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.data) {
      return {
        notFound: true
      };
    }
    return {
      props: {
        notifications: res.data
      }
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        ok: false,
        reason:
          'some error description for your own consumption, not for client side'
      }
    };
  }
}
