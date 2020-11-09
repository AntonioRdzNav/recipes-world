//==============================================================================
import _ from "lodash";
import React from "react";
import { ThemeProvider } from 'styled-components'
// react-menu
import Menu, {
    Dropdown, 
    DropdownItem, 
} from "@kenshooui/react-menu";
//==============================================================================
import {
    ReactMenu,
} from "./style.js";
//==============================================================================
function _ReactMenu (props) {

	const globalColor = window.colors;
	const { backgroundColorMenu=globalColor["dark"] } = props;
	const { backgroundColorMenu__Hover=globalColor["dark--hover"] } = props;
	const { dropdownItemsColor="white" } = props;
	const { label, options, style, onClickFocus, onClickBlur } = props;
	const { widthMenu } = props;

	const theme = {
			backgroundColorMenu,
			backgroundColorMenu__Hover,
			dropdownItemsColor,
			widthMenu,
	};

	return (
			<ThemeProvider theme={theme}>
					<ReactMenu style={style}>
							<Menu className="ReactMenu__AccountMenu">
									<Dropdown 
											onClick={onClickFocus}                      
											className="ReactMenu__AccountDropdown" 
											iconClassName="ReactMenu__AccountDropdownIcon"
											itemsClassName="ReactMenu__AccountDropdownItems"
											label={label}
									>
											{_.map(options, (option, i) => {
													return(
															<DropdownItem
																	key={i} 
																	onClick={() => {
																			option.onClick();
																			setTimeout(() => {                                        
																					onClickBlur();
																			}, 0);
																	}}
																	style={option.style}
															> 
																	{option.label}                                   
															</DropdownItem>
													);
											})}
									</Dropdown>
							</Menu>
					</ReactMenu>
			</ThemeProvider>
	);
}

export default _ReactMenu;