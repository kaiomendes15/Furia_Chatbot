import { Field, Input, defineStyle, IconButton, Flex } from "@chakra-ui/react";
import { IoMdSend } from "react-icons/io";
import { useDarkMode } from '../../contexts/DarkModeContext';

type InputWithButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  value: string
}


const InputWithButton = ({ onClick, onChange, value }: InputWithButtonProps) => {
  const { darkMode} = useDarkMode();

  const floatingStyles = defineStyle({
  
    pos: "absolute",
    px: "0.5",
    top: "-3",
    insetStart: "2",
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",
    bg: "transparent",
    fontFamily: "heading",
    _peerPlaceholderShown: {
      color: "gray.400",
      top: "2.5",
      insetStart: "3",
    },
    _peerFocusVisible: {
      color: darkMode ? "white" : "gray.400",
      top: "-3.5",
      insetStart: "3",
    },
  });

  
  return (
    <Field.Root w="full">
      <Flex pos="relative" w="full" gap={2}>
        <Input
          onChange={onChange}
          value={value}
          transition="color 0.2s ease, border-color 0.2s ease"
          className="peer"
          placeholder=" "
          bg={darkMode ? "" : ""}
          color={darkMode ? "white" : "white"}
          borderColor= ""
          _focusVisible={{
            borderColor: darkMode ? "white" : "gray.500",
            boxShadow: "none", // Remove o contorno
            outline: "none" // Garante que não haja outline
          }}
          
          _focus={{
            color: darkMode ? "white" : "white",
            boxShadow: "none" // Remove também no estado focus
          }}
          p={4}
          borderRadius="md"
          flex={1}
        />
        <IconButton
          onClick={onClick}
          aria-label="Send message"
          bg="gray.800"
          _hover={{ bg: "gray.700" }}
          _active={{ bg: "gray.600" }}
          size="md"
          borderRadius="md"
          _focus={{
            boxShadow: "none" // Remove também do botão se necessário
          }}
        >
          <IoMdSend color="#DDDDE4" />
        </IconButton>

        <Field.Label css={floatingStyles}>Mande sua mensagem...</Field.Label>
      </Flex>
    </Field.Root>
  );
};

export default InputWithButton;
