import Navbar from "./Components/Navbar";
import CartContainer from "./Components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculate, getCartItems } from "./features/cart/cartSlice";
import Modal from "./Components/Modal";

function App() {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(() => {
    dispatch(calculate());
  }, [cartItems]);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <CartContainer />
      {isOpen && <Modal />}
    </main>
  );
}
export default App;
