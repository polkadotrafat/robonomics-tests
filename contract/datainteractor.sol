// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DataInteractor {
    mapping(uint8 => uint128) private currentData;
    mapping(uint8 => uint128) private prevData;
    address public caller;

    function getData(uint8 device) public view returns(uint128) {
        uint128 ret = currentData[device];
        return ret;
    }

    function setData(uint8 device,uint128 data) public {
        // add checks
        caller = msg.sender;
        prevData[device] = currentData[device];
        currentData[device] = data;
    }
}