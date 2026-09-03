//Start:🕒 2026-09-03 Thursday 15:34:21
//Owner:🔧 AOSpro
//Call: 📞 t.me/aospro
//Project: 📌

/**
 * حساب المضروب للأعداد الصحيحة وغير الصحيحة
 * @param n الرقم المطلوب حساب مضروبه
 * @returns قيمة المضروب كـ number أو NaN في حال الخطأ
 */
export const calculateFactorial = (n: number): number => {
  if (n < 0) return NaN; // المضروب للأعداد السالبة غير معرف

  // إذا كان عدداً صحيحاً، نستخدم الحلقة التكرارية السريعة العادية
  if (Number.isInteger(n)) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }

  // إذا كان عدداً عشرياً (مثل 0.5!) نستخدم تقريب رامانوجان لدالة جاما (Gamma Function)
  // حيث أن x! = Gamma(x + 1)
  const x = n + 1;
  if (x <= 0) return NaN;

  // معادلة تقريب رامانوجان لدالة جاما لأداء رياضي عالي الدقة
  const pi = Math.PI;
  const part1 = Math.sqrt(pi) * Math.pow(x / Math.E, x);
  const part2 = Math.pow(8 * Math.pow(x, 3) + 4 * Math.pow(x, 2) + x + 1 / 30, 1 / 6);

  // تقسيم الناتج على x لأننا نريد Gamma(n+1) = n!
  const gammaResult = part1 * part2;
  return gammaResult / n;
};

