import { CameraAlt } from "@mui/icons-material";

export default function ProfileHeader({ user, currentImage, onImageClick, isEditing }) {
  // عرض الصورة: إذا كان هناك ملف جديد (File) يتم عرضه، وإلا نعرض رابط الصورة القديمة
  const imageSrc = currentImage instanceof File ? URL.createObjectURL(currentImage) : user?.image;

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        {/* قسم الصورة الشخصية */}
        <div className="relative">
          <img 
            src={imageSrc || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md" 
            alt="Profile" 
          />
          
          {/* أيقونة الكاميرا تظهر فقط عند التعديل */}
          {isEditing && (
            <button 
              onClick={onImageClick} 
              className="absolute bottom-0 right-0 p-1 bg-indigo-600 text-white rounded-full border-2 border-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <CameraAlt fontSize="small" />
            </button>
          )}
        </div>

        {/* قسم معلومات المستخدم */}
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
          <p className="text-sm text-gray-500 font-medium">{user?.email}</p>
          <p className="text-sm text-gray-400">{user?.mobile}</p>
        </div>
      </div>
    </div>
  );
}