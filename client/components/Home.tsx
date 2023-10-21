import React from 'react'
import {connect} from 'react-redux'
import SubmitTicket from './SubmitTicket';

interface HomeProps {
  username: string;
}
export const Home: React.FC<HomeProps> = props => {
  const {username} = props

  return (
    <div className='home-container'>
      <h3 className='home-welcome-message'>Welcome, {username}</h3>
      <SubmitTicket />
    </div>
  )
}

const mapState = (state: any) => {
  return {
    username: state.auth.username
  }
}

export default connect(mapState)(Home)
