from PIL import Image
import os

# 設定來源與輸出資料夾（可相同）
input_folder = "input_images"
output_folder = "output_images"
max_size_kb = 200  # 200 KB
max_size_bytes = max_size_kb * 1024

os.makedirs(output_folder, exist_ok=True)

def compress_to_target_size(img, output_path):
    quality = 95
    step = 5

    while quality > 5:
        img.save(output_path, format="JPEG", quality=quality, optimize=True)
        if os.path.getsize(output_path) <= max_size_bytes:
            return True
        quality -= step

    # 若無法壓到200kb以下，仍然輸出最小品質版本
    img.save(output_path, format="JPEG", quality=quality, optimize=True)
    return False

for filename in os.listdir(input_folder):
    if filename.lower().endswith(".png"):
        input_path = os.path.join(input_folder, filename)
        output_name = os.path.splitext(filename)[0] + ".jpg"
        output_path = os.path.join(output_folder, output_name)

        img = Image.open(input_path).convert("RGB")

        ok = compress_to_target_size(img, output_path)
        print(f"{filename} -> {output_name} ({'OK' if ok else '超過200KB'})")
