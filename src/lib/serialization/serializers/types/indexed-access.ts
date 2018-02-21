import { Component } from '../../../utils/component';
import { IndexedAccessType } from '../../../models';

import { TypeSerializerComponent } from '../../components';

@Component({name: 'serializer:indexed-access'})
export class IndexedAccessTypeSerializer extends TypeSerializerComponent<IndexedAccessType> {

  initialize(): void {
    super.initialize();
    this.supports = (t: IndexedAccessType) => t instanceof IndexedAccessType;
  }

  toObject(indexedAccessType: IndexedAccessType, obj?: any): any {
    obj = obj || {};

    obj.objectType = this.owner.toObject(indexedAccessType.objectType);
    obj.indexType = this.owner.toObject(indexedAccessType.indexType);

    return obj;
  }

}
