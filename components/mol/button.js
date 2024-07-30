import { Button } from "@chakra-ui/react"

const Buttons = ({ type = 'submit', className, ...props }) => (
    <Button
        type={type}
        fontSize="sm"
        variant="brand"
        fontWeight="500"
        w="100%"
        h="50"
        mb="24px"
        {...props}
    />
)

export default Buttons