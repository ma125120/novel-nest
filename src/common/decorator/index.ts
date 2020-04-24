import { plainToClass, classToPlain } from "class-transformer";

export const DelProps = (...props: any[]) => {
  return (target, key, desc: TypedPropertyDescriptor<any>) => {
    const val = desc.value;

    desc.value = async function(...args) {
      let res = await val.apply(this, args);
      const clear = item => (props.forEach(v => delete item[v]), item)
      if (res.push) {
        res = res.map(v => clear(v));
      } else if (res.records && res.records.length > 0) {
        res.records = res.records.map(v => clear(v))
      } else {
        clear(res)
      }
      
      return res;
    };

    return desc;
  };
};

export const plain2Class = (dataClass, data) => classToPlain(plainToClass(dataClass, data))

/**
 * 
 * @param res service提供的数据
 * @param dataClass 用于结构化的class，通常为该模块的Entity类
 */
export const transfromData = (res, dataClass,) => {
  if (Array.isArray(res)) {
    if (res.length === 2 && Array.isArray(res[0])) {
      const [records, total] = res
      return { records: records.map(v => plain2Class(dataClass, v)), total };
    }

    return res.map(v => plain2Class(dataClass, v));
  }

  return plain2Class(dataClass, res)
}

export const TransfromData = (dataClass) => (target, key, desc: TypedPropertyDescriptor<any>) => {
  const val = desc.value;

  desc.value = async function(...args) {
    const res = await val.apply(this, args);

    return transfromData(res, dataClass)
  };

  return desc;
}