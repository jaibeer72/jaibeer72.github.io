class ProjectsManger:

    isValid = False
    
    #Constructor equivalant 
    def __init__(self, name , gitlink):
        self.name = name 
        self.gitlink = gitlink
    
    def validate(self):
        return self.isValid
        