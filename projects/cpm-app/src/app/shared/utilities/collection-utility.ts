import * as _ from 'lodash';
import { List } from 'lodash';

export class CollectionUtility {
    static areEquivalent<T>(left: List<T>, right: List<T>){
        if(left == null || right == null){
            if(left != null || right != null){
                return false;
            }

            return true;
        }

        return left.length === right.length && _.xor(left, right).length === 0;
    }
}
