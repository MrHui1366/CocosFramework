import * as $protobuf from "protobufjs";
/** Namespace Net. */
export namespace Net {

    /** EDir enum. */
    enum EDir {
        UP = 1,
        RIGHT = 2,
        DOWN = 4,
        LEFT = 8
    }

    /** Properties of a Test1. */
    interface ITest1 {

        /** Test1 id */
        id?: (number|null);

        /** Test1 name */
        name?: (string|null);
    }

    /** Represents a Test1. */
    class Test1 implements ITest1 {

        /**
         * Constructs a new Test1.
         * @param [properties] Properties to set
         */
        constructor(properties?: Net.ITest1);

        /** Test1 id. */
        public id: number;

        /** Test1 name. */
        public name: string;

        /**
         * Creates a new Test1 instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Test1 instance
         */
        public static create(properties?: Net.ITest1): Net.Test1;

        /**
         * Encodes the specified Test1 message. Does not implicitly {@link Net.Test1.verify|verify} messages.
         * @param message Test1 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Net.ITest1, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Test1 message, length delimited. Does not implicitly {@link Net.Test1.verify|verify} messages.
         * @param message Test1 message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Net.ITest1, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Test1 message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Test1
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Net.Test1;

        /**
         * Decodes a Test1 message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Test1
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Net.Test1;

        /**
         * Verifies a Test1 message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Test1 message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Test1
         */
        public static fromObject(object: { [k: string]: any }): Net.Test1;

        /**
         * Creates a plain object from a Test1 message. Also converts values to other types if specified.
         * @param message Test1
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Net.Test1, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Test1 to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
