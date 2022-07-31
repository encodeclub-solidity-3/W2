// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

/// @title MyToken
/// @author Matthew Wager
/// @notice MyToken is a token contract that allows for minting and burning tokens.
contract MyToken is ERC20, AccessControl, ERC20Permit, ERC20Votes {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("DKC Token", "DKC") ERC20Permit("DKC Token") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    /// @notice Mints tokens for to address.
    /// @param to The address to mint tokens to.
    /// @param amount The amount of tokens to mint.
    /** @dev Creates `amount` tokens and assign them to `to`,
     *
     * Recuirements:
     * - `to` must be a valid address.
     * - `amount` must be a valid amount of tokens.
     * - only `MINTER_ROLE` can mint tokens.
     */
    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    // The following functions are overrides required by Solidity.

    /// @notice Hook that is called after any transfer of tokens.
    /// @param from The address tokens were transferred from.
    /// @param to The address tokens were transferred to.
    /// @param amount The amount of tokens transferred.
    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    /**
     * @dev Mint `amount` tokens to `to` address.
     * This internal function is called by {mint}
     * and is not intended to be called directly.
     */
    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    /**
    * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     */
    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}
