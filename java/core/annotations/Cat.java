package core.annotations;

public class Cat {

  @RunImmediately(times = 3)
  public void voice() {
    System.out.println("Meow!");
  }
}
