import { IconButton } from "@chakra-ui/react";
import { IoMdSend } from "react-icons/io"; // Ícone de envio (paper plane)

const SendMessageButton = () => {
    return (
        <IconButton
            aria-label="Send message"
            bg="gray.800"
            _hover={{ bg: "gray.700" }}
            _active={{ bg: "gray.600" }}
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            borderTopRightRadius="md"
            borderBottomRightRadius="md"
            size="md"
        >
            <IoMdSend color="#DDDDE4" />
        </IconButton>

      );
};

export default SendMessageButton;
