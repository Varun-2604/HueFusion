from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import colourize
import io
import cv2
import numpy as np
import base64

app = Flask(__name__)
CORS(app)

@app.route('/img', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return {'error': 'No image uploaded'}, 400

    file = request.files['image']
    if file:
        try:
            
            img = Image.open(file).convert('RGB')

           
            init_img = np.array(img)

            
            init_img = init_img[:, :, ::-1].copy()

            
            processed_img1 = colourize.Colorize(init_img, 35)
            processed_img2 = colourize.Colorize(init_img, 50)
            processed_img3 = colourize.Colorize(init_img, 62)

            
            processed_img1 = cv2.cvtColor(processed_img1, cv2.COLOR_BGR2RGB)
            processed_img2 = cv2.cvtColor(processed_img2, cv2.COLOR_BGR2RGB)
            processed_img3 = cv2.cvtColor(processed_img3, cv2.COLOR_BGR2RGB)

           
            pil_img1 = Image.fromarray(processed_img1)
            pil_img2 = Image.fromarray(processed_img2)
            pil_img3 = Image.fromarray(processed_img3)

            
            
            def pil_image_to_base64(pil_img):
                buffer = io.BytesIO()
                pil_img.save(buffer, format='JPEG')
                buffer.seek(0)
                img_bytes = buffer.getvalue()
                return base64.b64encode(img_bytes).decode('utf-8')
            
            img_base64_1 = pil_image_to_base64(pil_img1)
            img_base64_2 = pil_image_to_base64(pil_img2)
            img_base64_3 = pil_image_to_base64(pil_img3)

            
            return jsonify({
                'image1': img_base64_1,
                'image2': img_base64_2,
                'image3': img_base64_3
            }), 200
        except Exception as e:
            return {'error': f'Processing failed: {str(e)}'}, 500
    else:
        return {'error': 'No file received'}, 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)