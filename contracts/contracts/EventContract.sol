// SPDX-License-Identifier: LGPL-3.0+

pragma solidity ^0.8.2;

contract EventContract {

    event Click(address sender, uint num);

    uint num = 0;

    function click(uint up) public payable {
        num += up;
        emit Click(msg.sender, num);
    }
}
