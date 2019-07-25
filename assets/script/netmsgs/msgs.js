/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Net = (function() {

    /**
     * Namespace Net.
     * @exports Net
     * @namespace
     */
    var Net = {};

    /**
     * EDir enum.
     * @name Net.EDir
     * @enum {string}
     * @property {number} UP=1 UP value
     * @property {number} RIGHT=2 RIGHT value
     * @property {number} DOWN=4 DOWN value
     * @property {number} LEFT=8 LEFT value
     */
    Net.EDir = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[1] = "UP"] = 1;
        values[valuesById[2] = "RIGHT"] = 2;
        values[valuesById[4] = "DOWN"] = 4;
        values[valuesById[8] = "LEFT"] = 8;
        return values;
    })();

    Net.Test1 = (function() {

        /**
         * Properties of a Test1.
         * @memberof Net
         * @interface ITest1
         * @property {number|null} [id] Test1 id
         * @property {string|null} [name] Test1 name
         */

        /**
         * Constructs a new Test1.
         * @memberof Net
         * @classdesc Represents a Test1.
         * @implements ITest1
         * @constructor
         * @param {Net.ITest1=} [properties] Properties to set
         */
        function Test1(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Test1 id.
         * @member {number} id
         * @memberof Net.Test1
         * @instance
         */
        Test1.prototype.id = 0;

        /**
         * Test1 name.
         * @member {string} name
         * @memberof Net.Test1
         * @instance
         */
        Test1.prototype.name = "";

        /**
         * Creates a new Test1 instance using the specified properties.
         * @function create
         * @memberof Net.Test1
         * @static
         * @param {Net.ITest1=} [properties] Properties to set
         * @returns {Net.Test1} Test1 instance
         */
        Test1.create = function create(properties) {
            return new Test1(properties);
        };

        /**
         * Encodes the specified Test1 message. Does not implicitly {@link Net.Test1.verify|verify} messages.
         * @function encode
         * @memberof Net.Test1
         * @static
         * @param {Net.ITest1} message Test1 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Test1.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.name != null && message.hasOwnProperty("name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified Test1 message, length delimited. Does not implicitly {@link Net.Test1.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Net.Test1
         * @static
         * @param {Net.ITest1} message Test1 message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Test1.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Test1 message from the specified reader or buffer.
         * @function decode
         * @memberof Net.Test1
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Net.Test1} Test1
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Test1.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Net.Test1();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Test1 message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Net.Test1
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Net.Test1} Test1
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Test1.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Test1 message.
         * @function verify
         * @memberof Net.Test1
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Test1.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a Test1 message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Net.Test1
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Net.Test1} Test1
         */
        Test1.fromObject = function fromObject(object) {
            if (object instanceof $root.Net.Test1)
                return object;
            var message = new $root.Net.Test1();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a Test1 message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Net.Test1
         * @static
         * @param {Net.Test1} message Test1
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Test1.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.name = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this Test1 to JSON.
         * @function toJSON
         * @memberof Net.Test1
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Test1.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Test1;
    })();

    return Net;
})();

module.exports = $root;
