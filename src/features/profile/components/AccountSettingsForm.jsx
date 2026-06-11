import { CircularProgress } from "@mui/material";

export default function AccountSettingsForm({
  formData,
  setFormData,
  isEditing,
  onSave,
  onCancel,
  onEdit,
  isLoading,
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Full Name</label>
          <input
            disabled={!isEditing}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 transition-colors disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            Email Address
          </label>
          <input
            disabled
            value={formData.email}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 transition-colors disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">
            Phone Number
          </label>
          <input
            disabled={!isEditing}
            value={formData.phone}
            onChange={(e) => {
              // 1. السماح للمستخدم بكتابة أي شيء بحرية (دون تنسيق)
              setFormData({ ...formData, phone: e.target.value });
            }}
            onBlur={(e) => {
              // 2. عند فقدان التركيز: تنسيق الرقم
              let raw = e.target.value.trim();
              if (raw === "") return;

              // إزالة أي مسافات إضافية
              let cleaned = raw.replace(/\s/g, "");

              // إزالة رمز الدولة (أول 3 أرقام بعد +) واستبداله بـ 0
              let formatted = cleaned;
              if (cleaned.startsWith("+")) {
                // إزالة + وأول 3 أرقام (مثل +966 أو +962)
                let rest = cleaned.substring(4); // + 3 digits = 4 characters
                formatted = "0" + rest;
              } else if (cleaned.startsWith("966")) {
                // إزالة 966
                let rest = cleaned.substring(3);
                formatted = "0" + rest;
              } else if (cleaned.startsWith("0")) {
                // يبدأ بالفعل بـ 0، يبقى كما هو
                formatted = cleaned;
              } else {
                // أي حالة أخرى (أرقام فقط بدون رمز) -> أضف 0 في البداية
                formatted = "0" + cleaned;
              }

              // تحديث الحالة بالقيمة المنسقة
              setFormData({ ...formData, phone: formatted });
            }}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 transition-colors disabled:bg-gray-50 disabled:text-gray-400"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-8  pt-6">
        {!isEditing ? (
          <button
            onClick={onEdit}
            className="px-6 py-2.5 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="px-6 py-2.5 text-gray-600 cursor-pointer hover:bg-gray-100 font-medium rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={isLoading}
              className="px-6 py-2.5 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl flex items-center gap-2 min-w-[120px] justify-center transition-all"
            >
              {isLoading ? (
                <>
                  <CircularProgress size={18} color="inherit" />
                  <span>Saving...</span>
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
