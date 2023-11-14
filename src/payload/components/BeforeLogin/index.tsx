import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div>
      <p>
        <b>Welcome to your dashboard!</b>
        {' This is where site admins will log in to manage your store. Customers will need to '}
        <a href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/login`}>log in to the site instead</a>
        <a href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/joinasadmin`}>Create an admins account</a>
        {' to access their user account, order history, and more.'}
      </p>
    </div>
  )
}

export default BeforeLogin
