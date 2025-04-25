import { Box, Field, Input, defineStyle } from "@chakra-ui/react";

const floatingStyles = defineStyle({
    pos: "absolute",
    px: "0.5",
    top: "-3",
    insetStart: "2",
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",
    bg: "transparent",
    fontFamily: "heading", // <-- aqui você muda a fonte!
    _peerPlaceholderShown: {
      color: "gray.400",
      top: "2.5",
      insetStart: "3",
    },
    _peerFocusVisible: {
      color: "white",
      top: "-3",
      insetStart: "2",
    },
  });
  
  

const CustomInput = () => {
  return (
    <Field.Root w="full">
      <Box pos="relative" w="full">
        <Input
          className="peer"
          placeholder=" "
          bg="gray.800"           // Fundo escuro
          color="white"           // Texto branco
          borderColor="gray.700"  // Borda escura
          _focusVisible={{
            borderColor: "white", // Borda branca ao focar
          }}
          w="full"
          p={4}                  // Padding interno
          borderTopLeftRadius="md"
          borderBottomLeftRadius="md"
          borderTopRightRadius="0"
          borderBottomRightRadius="0"      // Bordas arredondadas
          borderRight="none"
        />
        <Field.Label css={floatingStyles}>Mande sua mensagem...</Field.Label>
      </Box>
    </Field.Root>
  );
}

export default CustomInput;
