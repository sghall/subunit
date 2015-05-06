import { SubUnitArray } from './SubUnitArray';
import { tagged } from "../selection/tagged";
import { remove } from "../selection/remove";
import { filter } from "../selection/filter";
import { datum } from "../selection/datum";
import { data } from "../selection/data";
import { attr } from "../selection/attr";
import { prop } from "../selection/prop";
import { sort } from "../selection/sort";
import { each } from "../selection/each";
import { on } from "../selection/on";

import { select } from '../selection/select';
import { selectAll } from '../selection/selectAll';
import { transition } from '../selection/transition';

export class Selection extends SubUnitArray {
  constructor(input) {
    super(input);
  }
}

Selection.prototype.tagged = tagged;
Selection.prototype.remove = remove;
Selection.prototype.filter = filter;
Selection.prototype.datum = datum;
Selection.prototype.data = data;
Selection.prototype.attr = attr;
Selection.prototype.prop = prop;
Selection.prototype.sort = sort;
Selection.prototype.each = each;
Selection.prototype.on = on;

Selection.prototype.select = select;
Selection.prototype.selectAll = selectAll;
Selection.prototype.transition = transition;
