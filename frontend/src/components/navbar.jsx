import React from "react";
import {
  Container,
  Flex,
  VStack,
  HStack,
  Heading,
  Avatar,
  AspectRatio,
  Image,
} from "@chakra-ui/react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";

const Navbar = (props) => {
  return (
    <Flex justify="space-between" padding={3}>
      <HStack>
        <AspectRatio w={12}>
          <Image
            src="https://media.licdn.com/dms/image/C560BAQGMF13IwiNIYA/company-logo_200_200/0/1646637771576?e=1681344000&v=beta&t=Upfe7Et1W32h_hA0QJl_84XHGamo-HqrsIBH9h9VOeg"
            alt="test"
          />
        </AspectRatio>
        <Heading size="lg">Cohesive</Heading>
      </HStack>
      <Menu align="flex-end">
        <MenuButton>
          <Avatar />
        </MenuButton>
        <MenuList>
          <MenuItem
            onClick={() => {
              props.setFriendmodalState(true);
            }}
          >
            Friends
          </MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default Navbar;
