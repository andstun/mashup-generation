from pytube import *

class mashupVideo:
    def __init__(self, video):
        self.video = video
        self.parentVideos = []

oneboredjeu = Playlist("https://www.youtube.com/playlist?list=UU_sMbyQqtLPZ9WjPcvOpbOA")
mashupVids = []

def main():
    videos = oneboredjeu.video_urls[0:9]
    for video in videos:
        mashup = mashupVideo(YouTube(video))
        description = mashup.video.description
        parents = (description.split("\n")[0]).split(" vs. ")
        for parent in parents:
            mashup.parentVideos.append(Search(parent).results[0])
        mashupVids.append(mashup)

    for vid in mashupVids:
        mashup = (vid.video).streams.filter(only_audio=True).first()
        parent1 = (vid.parentVideos[0]).streams.filter(only_audio=True).first()
        parent2 = (vid.parentVideos[1]).streams.filter(only_audio=True).first()

        id0 = (vid.video).video_id
        id1 = (vid.parentVideos[0]).video_id
        id2 = (vid.parentVideos[1]).video_id
        
        print (id0 + " " + id1 + " " + id2 +" " +  mashup.parse_codecs()[1])

        mashup.download(filename = id0 + "$" + id1 + "$" + id2 + ".mp4", output_path = "Downloads")
        parent1.download(filename = id1 + ".mp4", output_path = "Downloads")
        parent2.download(filename = id2 + ".mp4", output_path = "Downloads")

if __name__ == "__main__":
    main()

