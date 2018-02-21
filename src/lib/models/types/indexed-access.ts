import { IntersectionType, Type, UnionType } from './index';

/**
 * Represents an indexed access type.
 *
 * ~~~
 * let value: MyClass['foo'];
 * ~~~
 */
export class IndexedAccessType extends Type {

    /**
     * The type of the indexed object.
     */
    objectType: Type;

    /**
     * The type of the index.
     */
    indexType: Type;

    /**
     * The type name identifier.
     */
    readonly type: string = 'indexedAccess';

    /**
     * Create a new IndexedAccessType instance.
     *
     * @param objectType  The type of the indexed object.
     * @param indexType  The type of the index.
     */
    constructor(objectType: Type, indexType: Type) {
        super();
        this.objectType = objectType;
        this.indexType = indexType;
    }

    /**
     * Clone this type.
     *
     * @return A clone of this type.
     */
    clone(): Type {
        return new IndexedAccessType(this.objectType.clone(), this.indexType.clone());
    }

    /**
     * Test whether this type equals the given type.
     *
     * @param type  The type that should be checked for equality.
     * @returns TRUE if the given type equals this type, FALSE otherwise.
     */
    equals(type: Type): boolean {
        if (!(type instanceof IndexedAccessType)) {
            return false;
        }

        return type.objectType.equals(this.objectType)
            && type.indexType.equals(this.indexType);
    }

    /**
     * Return a raw object representation of this type.
     */
    toObject(): any {
        const result: any = super.toObject();
        result.objectType = this.objectType.toObject();
        result.indexType = this.indexType.toObject();
        return result;
    }

    /**
     * Return a string representation of this type.
     */
    toString() {
        const objectTypeStr = this.objectType.toString();
        const indexTypeStr = this.indexType.toString();
        if (this.objectType instanceof UnionType || this.objectType instanceof IntersectionType) {
            return '(' + objectTypeStr + ')[' + indexTypeStr + ']';
        } else {
            return objectTypeStr + '[' + indexTypeStr + ']';
        }
    }
}
