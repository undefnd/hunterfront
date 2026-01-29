
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}
