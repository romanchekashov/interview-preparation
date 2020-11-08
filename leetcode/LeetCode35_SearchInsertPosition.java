package leetcode;

public class LeetCode35_SearchInsertPosition extends AbsLeetCodeSolution {

    public static void main(String[] args) {
        new LeetCode35_SearchInsertPosition().executeTests();
    }

    @Override
    public void tests() {
        doAssert(searchInsert(new int[]{1,3,5,6}, 5) == 2);
        doAssert(searchInsert(new int[]{1,3,5,6}, 2) == 1);
        doAssert(searchInsert(new int[]{1,3,5,6}, 7) == 4);
        doAssert(searchInsert(new int[]{1,3,5,6}, 0) == 0);
        doAssert(searchInsert(new int[]{1}, 0) == 0);
    }

    public int searchInsert(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;
        int middle = 0;

        while (high >= low) {
            middle = (low + high) / 2;
            if (nums[middle] == target) return middle;
            if (nums[middle] < target) low = middle + 1;
            if (nums[middle] > target) high = middle - 1;
        }
        
        if (target > nums[middle]) middle++;
        
        return middle;
    }

}