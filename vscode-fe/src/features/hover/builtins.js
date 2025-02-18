'use strict';

const builtins = {
    "wei": {
        "prefix": "wei",
        "description": "1 wei == 10e-XX eth",
        "security": ""
    },
    "finney": {
        "prefix": "finney",
        "description": "1 finney == 10e-XX eth",
        "security": ""
    },
    "szabo": {
        "prefix": "szabo",
        "description": "1 szabo == 10e-XX eth",
        "security": ""
    },
    "ether": {
        "prefix": "ether",
        "description": "1 ether == 10e-XX eth",
        "security": ""
    },
    "seconds": {
        "prefix": "seconds",
        "description": "1 seconds == 10e-XX eth",
        "security": ""
    },
    "minutes": {
        "prefix": "minutes",
        "description": "1 minutes == 60 seconds",
        "security": "Note - for calendar calculations: does not account for leap seconds!"
    },
    "hours": {
        "prefix": "hours",
        "description": "1 hours == 60 minutes",
        "security": "Note - for calendar calculations: does not account for leap seconds!"
    },
    "days": {
        "prefix": "days",
        "description": "1 days == 24 hours",
        "security": "Note - for calendar calculations: does not account for leap year or leap seconds!"
    },
    "weeks": {
        "prefix": "weeks",
        "description": "1 weeks == 7 days",
        "security": "Note - for calendar calculations: does not account for leap year or leap seconds!"
    },
    "years": {
        "prefix": "years",
        "description": "1 years == 365 days",
        "security": "**deprecated - do not use** Note - for calendar calculations: does not account for leap year or leap seconds!"
    },
    "blockhash": {
        "prefix": "blockhash",
        "description": "blockhash(uint blockNumber) returns (bytes32): hash of the given block - only works for 256 most recent, excluding current, blocks",
        "security": ["Do not rely on block.timestamp, now and blockhash as a source of randomness, unless you know what you are doing.", "Both the timestamp and the block hash can be influenced by miners to some degree. Bad actors in the mining community can for example run a casino payout function on a chosen hash and just retry a different hash if they did not receive any money.", "The current block timestamp must be strictly larger than the timestamp of the last block, but the only guarantee is that it will be somewhere between the timestamps of two consecutive blocks in the canonical chain.", "The block hashes are not available for all blocks for scalability reasons. You can only access the hashes of the most recent 256 blocks, all other values will be zero.", "The function blockhash was previously known as block.blockhash, which was deprecated in version 0.4.22 and removed in version 0.5.0."]
    },
    "_blockhash": {
        "prefix": "block.blockhash",
        "description": "blockhash(uint blockNumber) returns (bytes32): hash of the given block - only works for 256 most recent, excluding current, blocks",
        "security": ["Do not rely on block.timestamp, now and blockhash as a source of randomness, unless you know what you are doing.", "Both the timestamp and the block hash can be influenced by miners to some degree. Bad actors in the mining community can for example run a casino payout function on a chosen hash and just retry a different hash if they did not receive any money.", "The current block timestamp must be strictly larger than the timestamp of the last block, but the only guarantee is that it will be somewhere between the timestamps of two consecutive blocks in the canonical chain.", "The block hashes are not available for all blocks for scalability reasons. You can only access the hashes of the most recent 256 blocks, all other values will be zero.", "The function blockhash was previously known as block.blockhash, which was deprecated in version 0.4.22 and removed in version 0.5.0."]
    },
    "_coinbase": {
        "prefix": "block.coinbase",
        "description": "block.coinbase (address payable): current block miner’s address",
        "security": ""
    },
    "_difficulty": {
        "prefix": "block.difficulty",
        "description": "block.difficulty (uint): current block difficulty",
        "security": ""
    },
    "_gaslimit": {
        "prefix": "block.gaslimit",
        "description": "block.gaslimit (uint): current block gaslimit",
        "security": ""
    },
    "_number": {
        "prefix": "block.number",
        "description": "block.number (uint): current block number",
        "security": "Can be manipulated by miner"
    },
    "_timestamp": {
        "prefix": "block.timestamp",
        "description": "block.timestamp (uint): current block timestamp as seconds since unix epoch",
        "security": ["Do not rely on block.timestamp, now and blockhash as a source of randomness, unless you know what you are doing.", "Both the timestamp and the block hash can be influenced by miners to some degree. Bad actors in the mining community can for example run a casino payout function on a chosen hash and just retry a different hash if they did not receive any money.", "The current block timestamp must be strictly larger than the timestamp of the last block, but the only guarantee is that it will be somewhere between the timestamps of two consecutive blocks in the canonical chain."]
    },
    "gasleft": {
        "prefix": "gasleft",
        "description": "gasleft() returns (uint256): remaining gas",
        "security": "The function gasleft was previously known as msg.gas, which was deprecated in version 0.4.21 and removed in version 0.5.0."
    },
    "msg": {
        "prefix": "msg",
        "description": "msg",
        "security": "The values of all members of msg, including msg.sender and msg.value can change for every external function call. This includes calls to library functions."
    },
    "_data": {
        "prefix": "msg.data",
        "description": "msg.data (bytes calldata): complete calldata",
        "security": ""
    },
    "_sender": {
        "prefix": "msg.sender",
        "description": "msg.sender (address payable): sender of the message (current call)",
        "security": "The values of all members of msg, including msg.sender and msg.value can change for every external function call. This includes calls to library functions."
    },
    "_sig": {
        "prefix": "msg.sig",
        "description": "msg.sig (bytes4): first four bytes of the calldata (i.e. function identifier)",
        "security": ""
    },
    "_value": {
        "prefix": "msg.value",
        "description": "msg.value (uint): number of wei sent with the message",
        "security": "The values of all members of msg, including msg.sender and msg.value can change for every external function call. This includes calls to library functions."
    },
    "now": {
        "prefix": "now",
        "description": "now (uint): current block timestamp (alias for block.timestamp)",
        "security": ["Do not rely on block.timestamp, now and blockhash as a source of randomness, unless you know what you are doing.", "Both the timestamp and the block hash can be influenced by miners to some degree. Bad actors in the mining community can for example run a casino payout function on a chosen hash and just retry a different hash if they did not receive any money.", "The current block timestamp must be strictly larger than the timestamp of the last block, but the only guarantee is that it will be somewhere between the timestamps of two consecutive blocks in the canonical chain."]
    },
    "_gasprice": {
        "prefix": "tx.gasprice",
        "description": "tx.gasprice (uint): gas price of the transaction",
        "security": ""
    },
    "_origin": {
        "prefix": "tx.origin",
        "description": "tx.origin (address payable): sender of the transaction (full call chain)",
        "security": "Do not use for authentication"
    },
    "abi": {
        "prefix": "abi",
        "description": "These encoding functions can be used to craft data for external function calls without actually calling an external function. Furthermore, keccak256(abi.encodePacked(a, b)) is a way to compute the hash of structured data (although be aware that it is possible to craft a “hash collision” using different function parameter types).",
        "security": "error prone"
    },
    "_decode": {
        "prefix": "abi.decode",
        "description": "abi.decode(bytes memory encodedData, (...)) returns (...): ABI-decodes the given data, while the types are given in parentheses as second argument. Example: (uint a, uint[2] memory b, bytes memory c) = abi.decode(data, (uint, uint[2], bytes))",
        "security": ""
    },
    "_encode": {
        "prefix": "abi.encode",
        "description": "abi.encode(...) returns (bytes memory): ABI-encodes the given arguments",
        "security": ""
    },
    "encodePacked": {
        "prefix": "abi.encodePacked",
        "description": "abi.encodePacked(...) returns (bytes memory): Performs packed encoding of the given arguments. Note that packed encoding can be ambiguous!",
        "security": ""
    },
    "_encodeWithSelector": {
        "prefix": "abi.encodeWithSelector",
        "description": "abi.encodeWithSelector(bytes4 selector, ...) returns (bytes memory): ABI-encodes the given arguments starting from the second and prepends the given four-byte selector",
        "security": ""
    },
    "encodeWithSignature": {
        "prefix": "abi.encodeWithSignature",
        "description": "abi.encodeWithSignature(string memory signature, ...) returns (bytes memory): Equivalent to abi.encodeWithSelector(bytes4(keccak256(bytes(signature))), ...)`",
        "security": ""
    },
    "assert": {
        "prefix": "assert",
        "description": "assert(bool condition):\ncauses an invalid opcode and thus state change reversion if the condition is not met - to be used for internal errors.",
        "security": ""
    },
    "require": {
        "prefix": "require",
        "description": ["require(bool condition):\n\treverts if the condition is not met - to be used for errors in inputs or external components.", "require(bool condition, string memory message):\n\treverts if the condition is not met - to be used for errors in inputs or external components. Also provides an error message."],
        "security": ""
    },
    "revert": {
        "prefix": "revert",
        "description": ["revert():\n\tabort execution and revert state changes", "revert(string memory reason):\n\tabort execution and revert state changes, providing an explanatory string"],
        "security": ""
    },
    "addmod": {
        "prefix": "addmod",
        "description": "addmod(uint x, uint y, uint k) returns (uint):\n\tcompute (x + y) % k where the addition is performed with arbitrary precision and does not wrap around at 2**256. Assert that k != 0 starting from version 0.5.0.",
        "security": ""
    },
    "mulmod": {
        "prefix": "mulmod",
        "description": "mulmod(uint x, uint y, uint k) returns (uint):\n\tcompute (x * y) % k where the multiplication is performed with arbitrary precision and does not wrap around at 2**256. Assert that k != 0 starting from version 0.5.0.",
        "security": ""
    },
    "keccak256": {
        "prefix": "keccak256",
        "description": "keccak256(bytes memory) returns (bytes32):\n\tcompute the Keccak-256 hash of the input",
        "security": ""
    },
    "sha256": {
        "prefix": "sha256",
        "description": "sha256(bytes memory) returns (bytes32):\n\tcompute the SHA-256 hash of the input",
        "security": "It might be that you run into Out-of-Gas for sha256, ripemd160 or ecrecover on a private blockchain. The reason for this is that those are implemented as so-called precompiled contracts and these contracts only really exist after they received the first message (although their contract code is hardcoded). Messages to non-existing contracts are more expensive and thus the execution runs into an Out-of-Gas error. A workaround for this problem is to first send e.g. 1 Wei to each of the contracts before you use them in your actual contracts. This is not an issue on the official or test net."
    },
    "ripemd160": {
        "prefix": "ripemd160",
        "description": "ripemd160(bytes memory) returns (bytes20):\n\tcompute RIPEMD-160 hash of the input",
        "security": "It might be that you run into Out-of-Gas for sha256, ripemd160 or ecrecover on a private blockchain. The reason for this is that those are implemented as so-called precompiled contracts and these contracts only really exist after they received the first message (although their contract code is hardcoded). Messages to non-existing contracts are more expensive and thus the execution runs into an Out-of-Gas error. A workaround for this problem is to first send e.g. 1 Wei to each of the contracts before you use them in your actual contracts. This is not an issue on the official or test net."
    },
    "ecrecover": {
        "prefix": "ecrecover",
        "description": "ecrecover(bytes32 hash, uint8 v, bytes32 r, bytes32 s) returns (address):\n\trecover the address associated with the public key from elliptic curve signature or return zero on error (example usage)",
        "security": ["Function ecrecover returns an address, and not an address payable. See address payable for conversion, in case you need to transfer funds to the recovered address.", "It might be that you run into Out-of-Gas for sha256, ripemd160 or ecrecover on a private blockchain. The reason for this is that those are implemented as so-called precompiled contracts and these contracts only really exist after they received the first message (although their contract code is hardcoded). Messages to non-existing contracts are more expensive and thus the execution runs into an Out-of-Gas error. A workaround for this problem is to first send e.g. 1 Wei to each of the contracts before you use them in your actual contracts. This is not an issue on the official or test net.", "check function signature (v:=uint8)", "check if replay protection is needed (nonce, chainid)"]
    },
    "sha3": {
        "prefix": "sha3",
        "description": "sha3() --> keccak256(bytes memory) returns (bytes32):\n\tcompute the Keccak-256 hash of the input",
        "security": "There used to be an alias for keccak256 called sha3, which was removed in version 0.5.0."
    },
    "_balance": {
        "prefix": ".balance",
        "description": "<address>.balance (uint256):\n\tbalance of the Address in Wei",
        "security": "Prior to version 0.5.0, Solidity allowed address members to be accessed by a contract instance, for example this.balance. This is now forbidden and an explicit conversion to address must be done: address(this).balance."
    },
    "_transfer": {
        "prefix": ".transfer",
        "description": "<address payable>.transfer(uint256 amount):\n\tsend given amount of Wei to Address, reverts on failure, forwards 2300 gas stipend, not adjustable",
        "security": ""
    },
    "_send": {
        "prefix": ".send",
        "description": "<address payable>.send(uint256 amount) returns (bool):\n\tsend given amount of Wei to Address, returns false on failure, forwards 2300 gas stipend, not adjustable",
        "security": "There are some dangers in using send: The transfer fails if the call stack depth is at 1024 (this can always be forced by the caller) and it also fails if the recipient runs out of gas. So in order to make safe Ether transfers, always check the return value of send, use transfer or even better: Use a pattern where the recipient withdraws the money."
    },
    "_call": {
        "prefix": ".call",
        "description": "<address>.call(bytes memory) returns (bool, bytes memory):\n\tissue low-level CALL with the given payload, returns success condition and return data, forwards all available gas, adjustable",
        "security": ["You should avoid using .call() whenever possible when executing another contract function as it bypasses type checking, function existence check, and argument packing.", "Prior to version 0.5.0, .call, .delegatecall and .staticcall only returned the success condition and not the return data."]
    },
    "_delegatecall": {
        "prefix": ".delegatecall",
        "description": "<address>.delegatecall(bytes memory) returns (bool, bytes memory):\n\tissue low-level DELEGATECALL with the given payload, returns success condition and return data, forwards all available gas, adjustable",
        "security": ["If state variables are accessed via a low-level delegatecall, the storage layout of the two contracts must align in order for the called contract to correctly access the storage variables of the calling contract by name. This is of course not the case if storage pointers are passed as function arguments as in the case for the high-level libraries.", "Prior to version 0.5.0, .call, .delegatecall and .staticcall only returned the success condition and not the return data."]
    },
    "_staticcall": {
        "prefix": ".staticcall",
        "description": ["<address>.staticcall(bytes memory) returns (bool, bytes memory):\n\tissue low-level STATICCALL with the given payload, returns success condition and return data, forwards all available gas, adjustable", "Prior to version 0.5.0, .call, .delegatecall and .staticcall only returned the success condition and not the return data."],
        "security": ""
    },
    "_callcode": {
        "prefix": ".callcode",
        "description": "<address>.delegatecall(bytes memory) returns (bool, bytes memory):\n\tissue low-level DELEGATECALL with the given payload, returns success condition and return data, forwards all available gas, adjustable",
        "security": "Prior to version 0.5.0, there was a member called callcode with similar but slightly different semantics than delegatecall."
    },
    "selfdestruct": {
        "prefix": "selfdestruct",
        "description": "selfdestruct(address payable recipient):\n\tdestroy the current contract, sending its funds to the given Address",
        "security": ""
    },
    "suicide": {
        "prefix": "suicide",
        "description": "selfdestruct(address payable recipient):\n\tdestroy the current contract, sending its funds to the given Address",
        "security": "Prior to version 0.5.0, there was a function called suicide with the same semantics as selfdestruct."
    },
    "this": {
        "prefix": "this",
        "description": "this (current contract’s type):\n\tthe current contract, explicitly convertible to Address",
        "security": ""
    },
    "_creationCode": {
        "prefix": ".creationCode",
        "description": "type(C).creationCode:\n\tMemory byte array that contains the creation bytecode of the contract. This can be used in inline assembly to build custom creation routines, especially by using the create2 opcode. This property can not be accessed in the contract itself or any derived contract. It causes the bytecode to be included in the bytecode of the call site and thus circular references like that are not possible.",
        "security": ""
    },
    "_runtimeCode": {
        "prefix": ".runtimeCode",
        "description": "type(C).runtimeCode:\n\tMemory byte array that contains the runtime bytecode of the contract. This is the code that is usually deployed by the constructor of C. If C has a constructor that uses inline assembly, this might be different from the actually deployed bytecode. Also note that libraries modify their runtime bytecode at time of deployment to guard against regular calls. The same restrictions as with .creationCode also apply for this property.",
        "security": ""
    },
    "memory": {
        "prefix": "memory",
        "description": "",
        "security": ["Array/Structs: check for uninit pointer.",
            "Array/Structs: check that variable is not used before declaration"]
    },
    "storage": {
        "prefix": "storage",
        "description": "",
        "security": ["Array/Structs: check for uninit pointer.",
            "Array/Structs: check that variable is not used before declaration"]
    },
    "ERC20": {
        "prefix": "ERC20",
        "description": "",
        "security": "check if contract was modified"
    },
    "while": {
        "prefix": "while",
        "description": "",
        "security": "LOOP - check for OOG conditions (locking ether, DoS, ...)"
    },
    "do": {
        "prefix": "do",
        "description": "",
        "security": "LOOP - check for OOG conditions (locking ether, DoS, ...)"
    },
    "for": {
        "prefix": "for",
        "description": "",
        "security": "LOOP - check for OOG conditions (locking ether, DoS, ...)"
    },
    "pragma": {
        "prefix": "pragma",
        "description": "",
        "security": "avoid using experimental features! avoid specifying version ^"
    },
    "is": {
        "prefix": "is",
        "description": "",
        "security": "check inheritance order"
    },
    ">>": {
        "prefix": ">>",
        "description": "",
        "security": "The results produced by shift right of negative values of signed integer types is different from those produced by other programming languages. In Solidity, shift right maps to division so the shifted negative values are going to be rounded towards zero (truncated). In other programming languages the shift right of negative values works like division with rounding down (towards negative infinity)."
    },
    "byte": {
        "prefix": "byte",
        "description": "byte is an alias for bytes1",
        "security": ""
    },
    "bytes": {
        "prefix": "bytes",
        "description": "Dynamically-sized byte array, see Arrays. Not a value-type!",
        "security": "As a rule of thumb, use bytes for arbitrary-length raw byte data and string for arbitrary-length string (UTF-8) data. If you can limit the length to a certain number of bytes, always use one of bytes1 to bytes32 because they are much cheaper."
    },
    "string": {
        "prefix": "string",
        "description": "Dynamically-sized UTF-8-encoded string, see Arrays. Not a value-type!",
        "security": "As a rule of thumb, use bytes for arbitrary-length raw byte data and string for arbitrary-length string (UTF-8) data. If you can limit the length to a certain number of bytes, always use one of bytes1 to bytes32 because they are much cheaper."
    },
    "_length": {
        "prefix": ".length",
        "description": "<byte[]|array>.length yields the fixed length of the byte array (read-only)."
    },
    "pub": {
        "prefix": "pub",
        "description": "Public functions are part of the contract interface and can be either called internally or via messages. For public state variables, an automatic getter function (see below) is generated.",
        "security": "make sure to authenticate calls to this method as anyone can access it"
    },
    "external": {
        "prefix": "external",
        "description": "External functions are part of the contract interface, which means they can be called from other contracts and via transactions. An external function f cannot be called internally (i.e. f() does not work, but this.f() works). External functions are sometimes more efficient when they receive large arrays of data.",
        "security": "make sure to authenticate calls to this method as anyone can access it"
    },
    "internal": {
        "prefix": "internal",
        "description": "Those functions and state variables can only be accessed internally (i.e. from within the current contract or contracts deriving from it), without using this."
    },
    "private": {
        "prefix": "private",
        "description": "Private functions and state variables are only visible for the contract they are defined in and not in derived contracts.",
        "security": "Everything that is inside a contract is visible to all external observers. Making something private only prevents other contracts from accessing and modifying the information, but it will still be visible to the whole world outside of the blockchain."
    },
    "pure": {
        "prefix": "pure",
        "description": "Functions can be declared pure in which case they promise not to read from or modify the state.",
        "security": ["It is not possible to prevent functions from reading the state at the level of the EVM, it is only possible to prevent them from writing to the state (i.e. only view can be enforced at the EVM level, pure can not).",
            "Before version 0.4.17 the compiler didn’t enforce that pure is not reading the state."]
    },
    "view": {
        "prefix": "view",
        "description": "function call CANNOT write state. It is however allowed to read state.",
        "security": ["Functions can be declared view in which case they promise not to modify the state.",
            "constant on functions is an alias to view, but this is deprecated and will be dropped in version 0.5.0.", "Getter methods are marked view.",
            "The compiler does not enforce yet that a view method is not modifying state. It raises a warning though."]
    },
    "extcodehash": {
        "prefix": "extcodehash",
        "description": "",
        "security": "Note that EXTCODEHASH will be zero during constructor calls. Therefore it is not fit to use it to check if an address is a contract or not as this can be subverted by calling your contract in a constructor."
    },
    "contract": {
        "prefix": "contract",
        "description": ["Contracts in Ethereum are similar to classes in object-oriented languages.",
            "They contain persistent data in state variables,",
            "and functions that can modify these variables.",
            "Calling a function on a different contract (instance) will perform an EVM function call",
            "and thus switch the context such that state variables in the calling contract",
            "are inaccessible. A contract and its functions need to be called for anything to happen.",
            "There is no “cron” concept in Ethereum to call a function at a particular event automatically."],
        "security": ""

    },
    "__init__": {
        "prefix": "__init__",
        "description": "The first method that is called after contract creation.",
        "security": ""
    },
    // The unsigned integer types consist of:

    // Type	Minimum	Maximum
    "u8": { "prefix": "u8", "description": "unsigned integer type with values from 0 to	2^8-1", "security": "" },
    "u16": { "prefix": "u16", "description": "unsigned integer type with values from 	0 to	2^16-1", "security": "" },
    "u32": { "prefix": "u32", "description": "unsigned integer type with values from 	0 to	2^32-1", "security": "" },
    "u64": { "prefix": "u64", "description": "unsigned integer type with values from 	0 to	2^64-1", "security": "" },
    "u128": { "prefix": "u128", "description": "unsigned integer type with values from 	0 to	2^128-1", "security": "" },
    "u256": { "prefix": "u256", "description": "unsigned integer type with values from 	0 to	2^256-1", "security": "" },
    // The signed two's complement integer types consist of:

    // Type	Minimum	Maximum
    "i8": { "prefix": "i8", "description": "signed integer type with values from 	-(2^7)	to 2^7-1", "security": "" },
    "i16": { "prefix": "i16", "description": "signed integer type with values from 	-(2^15) to	2^15-1", "security": "" },
    "i32": { "prefix": "i32", "description": "signed integer type with values from 	-(2^31) to	2^31-1", "security": "" },
    "i64": { "prefix": "i64", "description": "signed integer type with values from 	-(2^63) to	2^63-1", "security": "" },
    "i128": { "prefix": "i128", "description": "signed integer type with values from 	-(2^127) to	2^127-1", "security": "" },
    "i256": { "prefix": "i256", "description": "signed integer type with values from 	-(2^255) to	2^255-1", "security": "" },
    "Map": {
        "prefix": "Map", "description": ["HashMap type","Maps a key to a value",
            "Example:",
            "Map<TKey,TValue>",
            "Where TKey is a base type and TValue is any data type."], "security": ""
    },
    "struct": { "prefix": "struct",
    "description": "XXX",
    "security": "" },
    "event": { "prefix": "event", 
    "description": "An event type is the type denoted by the name of an event item.",
    "security": "" },
    "to_mem": {
        "prefix": "to_mem",
        "description": ["Reference type values can be copied from storage and into memory using the to_mem function.",
            "Example:",
            "my_array_var: u256[10] = self.my_array_field.to_mem()"],
        "security": ""
    },
    "clone": {
        "prefix": "clone", "description":
            ["Reference type values in memory can be cloned using the clone function.",
                "Example:",
                "# with clone",
                "foo: u256[10] = bar.clone() # `foo` points to a new segment of memory",
                "assert foo[1] == bar[1]",
                "foo[1] = 42",
                "assert foo[1] != bar[1] # modifying `foo` does not modify bar",
                "",
                "# without clone",
                "foo: u256[10] = bar # `foo` and `bar` point to the same segment of memory",
                "assert foo[1] == bar[1]",
                "foo[1] = 42",
                "assert foo[1] == bar[1] # modifying `foo` also modifies `bar`"],
        "security": ""
    },
}

module.exports = {
    builtins: builtins
};