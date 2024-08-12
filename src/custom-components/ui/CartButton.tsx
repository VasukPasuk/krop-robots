import { ButtonProps, Button} from "@mui/material";
import {MdAddShoppingCart, MdRemoveShoppingCart} from "react-icons/md";

interface CartButtonProps extends ButtonProps {
  cart: "remove" | "add"
}

const texts = {
  "remove": {
    icon: <MdRemoveShoppingCart/>,
    text: "Видалити",
  },
  "add": {
    icon: <MdAddShoppingCart/>,
    text: "Додати",
  }
}

export default function CartButton({cart, ...rest}: CartButtonProps) {
  return (
    <Button endIcon={texts[cart].icon} {...rest}>
      {texts[cart].text}
    </Button>
  )
}