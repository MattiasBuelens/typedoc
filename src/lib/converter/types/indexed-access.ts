import * as ts from 'typescript';

import { Type, IndexedAccessType } from '../../models/types/index';
import { Component, ConverterTypeComponent, TypeConverter } from '../components';
import { Context } from '../context';

@Component({name: 'type:indexed-access'})
export class IndexedAccessConverter extends ConverterTypeComponent implements TypeConverter<ts.IndexedAccessType, ts.IndexedAccessTypeNode> {
    /**
     * Test whether this converter can handle the given TypeScript node.
     */
    supportsNode(context: Context, node: ts.IndexedAccessTypeNode): boolean {
        return node.kind === ts.SyntaxKind.IndexedAccessType;
    }

    /**
     * Test whether this converter can handle the given TypeScript type.
     */
    supportsType(context: Context, type: ts.IndexedAccessType): boolean {
        return !!(type.flags & ts.TypeFlags.IndexedAccess);
    }

    /**
     * Convert the given array type node to its type reflection.
     *
     * This is a node based converter with no type equivalent.
     *
     * ```
     * let someValue: number[];
     * ```
     *
     * @param context  The context object describing the current state the converter is in.
     * @param node  The array type node that should be converted.
     * @returns The type reflection representing the given array type node.
     */
    convertNode(context: Context, node: ts.IndexedAccessTypeNode): Type {
        const objectType = this.owner.convertType(context, node.objectType);
        const indexType = this.owner.convertType(context, node.indexType);

        return new IndexedAccessType(objectType, indexType);
    }

    /**
     * Convert the given type reference to its type reflection.
     *
     * This is a type based converter, see [[convertTypeReference]] for the node equivalent.
     *
     * ```
     * class SomeClass { }
     * let someValue: SomeClass;
     * ```
     *
     * @param context  The context object describing the current state the converter is in.
     * @param type  The type reference that should be converted.
     * @returns The type reflection representing the given type reference.
     */
    convertType(context: Context, type: ts.IndexedAccessType): Type {
        const objectType = this.owner.convertType(context, null, type.objectType);
        const indexType = this.owner.convertType(context, null, type.indexType);

        return new IndexedAccessType(objectType, indexType);
    }
}
