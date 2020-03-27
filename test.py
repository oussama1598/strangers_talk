from app.lib.unsplash import get_random_image
from app.lib.ayat import get_todays_aya
from app.modules.card_generator.image_generator import generate_card
from app.modules.facebook_poster import post_to_facebook
from app.modules.downloader import download_file

aya_data = get_todays_aya()

print(aya_data)
# # image_data = get_random_image('nature')

# # bg_url = image_data['bg_url']
# aya = aya_data['aya']
# sora = aya_data['sora_arabic']
# sora_english = aya_data['sora_english']
# aya_en_transaltion = aya_data['aya_en_transaltion']
# aya_number = aya_data['aya_number']
# aya_audio = aya_data['aya_audio']

# download_file(
#     'https://dailyayat.com/recitation/alfasay/026136.mp3', 'audio.mp3')

# print(aya, aya_audio)

# from app.modules.video_generator import generate_video_from_audio_with_image


# generate_video_from_audio_with_image(
#     '/tmp/generated_image.jpg', 'audio.mp3', 'video.mp4')

# post_image('', '')
