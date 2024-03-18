import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import PaymentDetails from '../Components/payment/PaymentDetails';
import { useAppDispatch } from '../redux/hook';
import { isLoggedIn } from '../utils/isLoggedIn';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
        const dispatch = useAppDispatch();
        const navigate = useNavigate()
        const user = isLoggedIn(dispatch);

        if(user !== 'patient'){
           navigate('/login')
        }   

  return (
        <div className="home-section">
        <Navbar />
        <h1>Payments</h1>
        <hr />
        <PaymentDetails/>
        <Footer />
      </div>
  )
}

export default PaymentPage
