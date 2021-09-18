from pytube import *

class mashupVideo:
    def __init__(self, video):
        self.video = video
        self.parentVideos = []

oneboredjeu = Playlist("https://www.youtube.com/playlist?list=UU_sMbyQqtLPZ9WjPcvOpbOA")
inanimateMashups = Playlist("https://www.youtube.com/playlist?list=UUKpJ9oM0fXCEAlJBgfThkQw")
maxVidLength = 600
def main():
    videos = inanimateMashups.video_urls
    for i, video in enumerate(videos):
        print(str(i) + " of " + str(len(videos)))
        try:
            vid = mashupVideo(YouTube(video))
            if (vid.video.length > maxVidLength):
                continue
            description = vid.video.description
            inanimateDescription = description.split("\n")
            
            parents = [] #(description.split("\n")[0]).split(" vs. ") 
            for line in inanimateDescription:
                if " vs " in line:
                    parents = line.split(" vs ")
            try:
                for parent in parents:
                    results = Search(parent).results
                    i = 0
                    while (results[i].length > maxVidLength): # Get rid of full album videos and 10 hour covers
                        i += 1
                    vid.parentVideos.append(results[i])
            except:
                print("Search Error for the following Mashup: " + mashup.video.title)
                continue

            mashup = (vid.video).streams.filter(only_audio=True).first()
            parent1 = (vid.parentVideos[0]).streams.filter(only_audio=True).first()
            parent2 = (vid.parentVideos[1]).streams.filter(only_audio=True).first()

            id0 = (vid.video).video_id
            id1 = (vid.parentVideos[0]).video_id
            id2 = (vid.parentVideos[1]).video_id
            
            print (id0 + " " + id1 + " " + id2 +" " +  mashup.parse_codecs()[1])

            mashup.download(filename = id0 + "$" + id1 + "$" + id2 + ".mp4", output_path = "Downloads1")
            parent1.download(filename = id1 + ".mp4", output_path = "Downloads1")
            parent2.download(filename = id2 + ".mp4", output_path = "Downloads1")
        except:
            print("error: skipping " + video)

if __name__ == "__main__":
    main()

