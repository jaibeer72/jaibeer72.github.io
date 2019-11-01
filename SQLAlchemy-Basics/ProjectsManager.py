class ProjectsManger:

    isValid = False
    
    #Constructor equivalant 
    def __init__(self, name , gitlink):
        self.name = name 
        self.gitlink = gitlink
    
    def validate(self):
        #Checking for null or empty
        if not self.gitlink: 
            self.isValid = False

        return self.isValid
    